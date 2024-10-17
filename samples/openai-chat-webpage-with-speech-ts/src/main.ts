var use_continuous_speech_input: boolean = false;
var update_prompt_to_generate_ssml: boolean = true;
var speak_iteratively_while_streaming: boolean = true;
var voice_name: string = 'en-US-AndrewNeural';
var voice_rate: string = '+20%';

import { OpenAI} from 'openai';
import { OpenAIChatCompletionStreamingClass } from "./OpenAIChatCompletionStreamingClass";

// What's the system prompt?
const AZURE_OPENAI_SYSTEM_PROMPT = import.meta.env.AZURE_OPENAI_SYSTEM_PROMPT ?? "You are a helpful AI assistant.";

// NOTE: Never deploy your API Key in client-side environments like browsers or mobile apps
// SEE: https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety

// Get the required environment variables, and form the base URL for Azure OpenAI Chat Completions API
const AZURE_AI_SPEECH_KEY = import.meta.env.AZURE_AI_SPEECH_KEY;
const AZURE_AI_SPEECH_REGION = import.meta.env.AZURE_AI_SPEECH_REGION;
const AZURE_OPENAI_API_KEY = import.meta.env.AZURE_OPENAI_API_KEY ?? "<insert your Azure OpenAI API key here>";
const AZURE_OPENAI_API_VERSION = import.meta.env.AZURE_OPENAI_API_VERSION ?? "<insert your Azure OpenAI API version here>";
const AZURE_OPENAI_CHAT_DEPLOYMENT = import.meta.env.AZURE_OPENAI_CHAT_DEPLOYMENT ?? "<insert your Azure OpenAI chat deployment name here>";
const AZURE_OPENAI_ENDPOINT = import.meta.env.AZURE_OPENAI_ENDPOINT ?? "<insert your Azure OpenAI endpoint here>";
const AZURE_OPENAI_BASE_URL = `${AZURE_OPENAI_ENDPOINT.replace(/\/+$/, '')}/openai/deployments/${AZURE_OPENAI_CHAT_DEPLOYMENT}`;

// Get the required environment variables for OpenAI
const OPENAI_API_KEY = import.meta.env.OPENAI_API_KEY ?? "<insert your OpenAI API key here>";
const OPENAI_MODEL_NAME = import.meta.env.OPENAI_MODEL_NAME ?? "<insert your OpenAI model name here>";

// Check if the required environment variables are set
const azureOk = 
    AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.startsWith('<insert') &&
    AZURE_OPENAI_API_KEY != null && !AZURE_OPENAI_API_KEY.startsWith('<insert') &&
    AZURE_OPENAI_API_VERSION != null && !AZURE_OPENAI_API_VERSION.startsWith('<insert') &&
    AZURE_OPENAI_CHAT_DEPLOYMENT != null && !AZURE_OPENAI_CHAT_DEPLOYMENT.startsWith('<insert') &&
    AZURE_OPENAI_ENDPOINT != null && !AZURE_OPENAI_ENDPOINT.startsWith('<insert');
const oaiOk = 
    OPENAI_API_KEY != null && !OPENAI_API_KEY.startsWith('<insert');
    OPENAI_MODEL_NAME != null && !OPENAI_MODEL_NAME.startsWith('<insert') &&
    AZURE_OPENAI_SYSTEM_PROMPT != null && !AZURE_OPENAI_SYSTEM_PROMPT.startsWith('<insert');
const ok = azureOk || oaiOk;

if (!ok) {
    console.error('To use OpenAI, set the following environment variables:\n' +
        '\n  OPENAI_API_KEY' +
        '\n  OPENAI_ORG_ID (optional)' +
        '\n  OPENAI_MODEL_NAME' +
        '\n  AZURE_OPENAI_SYSTEM_PROMPT');
    console.error('\nYou can easily obtain some of these values by visiting these links:\n' +
        '\n  https://platform.openai.com/api-keys' +
        '\n  https://platform.openai.com/settings/organization/general' +
        '\n  https://platform.openai.com/playground/assistants' +
        '\n' +
        '\n Then, do one of the following:\n' +
        '\n  ai dev new .env' +
        '\n  npm run dev' +
        '\n' +
        '\n  or' +
        '\n' +
        '\n  ai dev shell --run "npm run dev"');
    console.error('To use Azure OpenAI, set the following environment variables:\n' +
        '\n  AZURE_OPENAI_SYSTEM_PROMPT' +
        '\n  AZURE_OPENAI_API_KEY' +
        '\n  AZURE_OPENAI_API_VERSION' +
        '\n  AZURE_OPENAI_CHAT_DEPLOYMENT' +
        '\n  AZURE_OPENAI_ENDPOINT');
    console.error('\nYou can easily do that using the Azure AI CLI by doing one of the following:\n' +
        '\n  ai init' +
        '\n  ai dev new .env' +
        '\n  npm run dev' +
        '\n' +
        '\n  or' +
        '\n' +
        '\n  ai init' +
        '\n  ai dev shell --run "npm run dev"');
    throw new Error('Missing environment variables');
}

// Set up the internal variables
var sentinel: string = '\u001E';
var streamCount: number = 0;

// Create the OpenAI client
console.log(azureOk
    ? 'Using Azure OpenAI (w/ API Key)...'
    : 'Using OpenAI...');
const openai = !azureOk
    ? new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    })
    : new OpenAI({
        apiKey: AZURE_OPENAI_API_KEY,
        baseURL: AZURE_OPENAI_BASE_URL,
        defaultQuery: { 'api-version': AZURE_OPENAI_API_VERSION },
        defaultHeaders: { 'api-key': AZURE_OPENAI_API_KEY },
        dangerouslyAllowBrowser: true});

const updatedPrompt = !update_prompt_to_generate_ssml
    ? AZURE_OPENAI_SYSTEM_PROMPT
    : AZURE_OPENAI_SYSTEM_PROMPT + 
        '\n\nAI, please follow the given instructions for generating all responses:' +
        '\n* You must only generate SSML fragments.' +
        '\n* The SSML fragments must be balanced and well-formed, meaning that each opening tag must have a corresponding closing tag.' +
        '\n* The SSML fragments must not contain <speak> or <voice> tags.' +
        '\n* The SSML fragments may only contain <p>, <emphasis>, and <prosody> tags.' +
        '\n* Never use the rate attribute in the <prosody> tag.' +
        '\n* Ensure the narrative is positive, upbeat, and cheerful.' +
        '\n* If you use "&" or "<" or ">", you must escape them as "&amp;", "&lt;", "&gt;" respectively.' +
        '\n* Use a friendly and engaging tone. Provide more emphasis than usual on important parts.' +
        '\n* Break your response into separate SSML fragments at sentence boundaries.' +
        '\n* You **MUST NOT** put more than one sentence in a single SSML fragment.' +
        '\n* If a sentence becomes too long, make the SSML fragment shorter by breaking at thoughtful thought boundaries.' +
        '\n* Between SSML fragments, use a sentinel of \"' + sentinel + '\".';

// Create the streaming chat completions helper
const chat = azureOk
    ? new OpenAIChatCompletionStreamingClass(AZURE_OPENAI_CHAT_DEPLOYMENT, updatedPrompt, openai)
    : new OpenAIChatCompletionStreamingClass(OPENAI_MODEL_NAME, updatedPrompt, openai);

// Setup the speech parts
import * as AzureSpeech from 'microsoft-cognitiveservices-speech-sdk';
const speechConfig = AzureSpeech.SpeechConfig.fromSubscription(AZURE_AI_SPEECH_KEY, AZURE_AI_SPEECH_REGION);
const audioConfigMicrophone = AzureSpeech.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new AzureSpeech.SpeechRecognizer(speechConfig, audioConfigMicrophone);

var player: AzureSpeech.SpeakerAudioDestination | null = null;
var speakers: AzureSpeech.AudioConfig | null = null;
var synthesizer: AzureSpeech.SpeechSynthesizer | null = null;

function initSpeechSynthesizer(): AzureSpeech.SpeechSynthesizer {
    console.log('Initializing speech synthesis...');
    player = new AzureSpeech.SpeakerAudioDestination();
    speakers = AzureSpeech.AudioConfig.fromSpeakerOutput(player);
    synthesizer = new AzureSpeech.SpeechSynthesizer(speechConfig, speakers);
    console.log('Initializing speech synthesis... Done!');
    return synthesizer;
}

function stopSpeaking(): void {
    ++streamCount;
    if (player != null && synthesizer != null) {
        console.log('Stopping speech synthesis...');
        var p = player;
        var s = synthesizer;

        player = null;
        speakers = null;
        synthesizer = null;

        p.mute();
        s.close();
        p.close();
        console.log('Speech synthesis stopped.')
    }
}

function speak(text: string): void {
    if (text == null || text == '') return;

    text = text.trim();
    if (text == '') return;

    if (synthesizer == null) {
        synthesizer = initSpeechSynthesizer();
    }

    console.log('Speaking: ' + text);
    var ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">' +
        `<voice name="${voice_name}">` +
            `<prosody rate="${voice_rate}">` +
                text +
            '</prosody>' +
        '</voice>' +
    '</speak>';

    synthesizer.speakSsmlAsync(ssml,
        result => {
            if (result.reason === AzureSpeech.ResultReason.SynthesizingAudioCompleted) {
                // console.log('Speech synthesis completed.');
            } else {
                console.error('Speech synthesis failed: ', result.errorDetails);
            }
        },
        error => {
            console.error('Speech synthesis error: ', error);
        }
    );
}

var listening: boolean = false;
function toggleSpeechRecognition(): void{
    if (!listening) {
        console.log("Speech recognition started");
        if (use_continuous_speech_input) {
            recognizer.startContinuousRecognitionAsync();
        }
        else {
            recognizer.recognizeOnceAsync();
        }
        listening = true;

        const textBox = document.getElementById('text-box') as HTMLInputElement;
        textBox.placeholder = 'Listening... (press ENTER to stop)';
    }
    else {
        console.log("Speech recognition stopping");
        recognizer.stopContinuousRecognitionAsync();
        listening = false;

        const textBox = document.getElementById('text-box') as HTMLInputElement;
        textBox.placeholder = 'Type here or press ENTER to start listening...';
    }
}

recognizer.recognizing = (_, e) => handleRecognizing(e);
recognizer.recognized = (_, e) => handleRecognized(e);

async function processUserInput(text: string, ensureUiUpdated: () => void): Promise<void> {

    var undefined: boolean = text == null || text == '' || text == "undefined";
    if (undefined) return;

    var updatedUi: boolean = false;

    console.log('Speaking: ... preparing to stream SSML ...');
    var streamNumber: number = ++streamCount;
    var accumulator: string = '';
    var response = await chat.getResponse(text, (response: string) => {
        if (streamNumber != streamCount) return;

        if (!updatedUi) {
            updatedUi = true;
            ensureUiUpdated();
        }

        if (speak_iteratively_while_streaming) {
            accumulator += response;
            if (accumulator.includes(sentinel)) {
                console.log('Accumulator: ' + accumulator);
                const sentences = accumulator.split(sentinel);
                for (const sentence of sentences) {
                    speak(sentence);
                }
                accumulator = '';
            }
        }
    });

    if (!updatedUi) {
        updatedUi = true;
        ensureUiUpdated();
    }

    console.log('Accumulator: ' + accumulator);
    const sentences = speak_iteratively_while_streaming
        ? accumulator.split(sentinel)
        : response.split(sentinel);
    for (const sentence of sentences) {
        speak(sentence);
    }

    console.log('Speaking: ... FINISHED !!!');
}

function handleRecognizing(e: any) {
    console.log(`RECOGNIZING: Text=${e.result.text}`);
    stopSpeaking();

    const textBox = document.getElementById('text-box') as HTMLInputElement;
    textBox.value = e.result.text;
}

async function handleRecognized(e: any) {

    if (!use_continuous_speech_input) {
        listening = false;
        updateButtonIcon();
    }

    const textBox = document.getElementById('text-box') as HTMLInputElement;

    if (e.result.reason === AzureSpeech.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        textBox.value = e.result.text;
        stopSpeaking();

        await processUserInput(textBox.value, () => {
            textBox.value = '';
            updateButtonIcon();
        });
    } else if (e.result.reason === AzureSpeech.ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
        textBox.value = '';
        updateButtonIcon();
    }
}

function handleButtonClick(): void {
    stopSpeaking();
    const textBox = document.getElementById('text-box') as HTMLInputElement;
    if (textBox.value === '' || listening) {
        toggleSpeechRecognition();
        updateButtonIcon();
    } else {
        stopSpeaking();
        processUserInput(textBox.value, () => {
            textBox.value = '';
            updateButtonIcon();
        });
    }
}

function updateButtonIcon(): void {
    const textBox = document.getElementById('text-box') as HTMLInputElement;
    const button = document.getElementById('submit-button') as HTMLButtonElement;
    if (textBox.value === '') {
        if (listening) {
            button.innerHTML = '<i class="fa fa-solid fa-stop"></i>';
        }
        else {
            button.innerHTML = '<i class="fa fa-microphone" aria-hidden="true"></i>';
            textBox.placeholder = 'Type here or press ENTER to start listening...';
        }
    } else {
        button.innerHTML = '<i class="fa fa-solid fa-arrow-up"></i>';

    }
}

document.addEventListener('DOMContentLoaded', () => {

    updateButtonIcon();

    const button = document.getElementById('submit-button') as HTMLButtonElement;
    button.addEventListener('click', handleButtonClick);

    const textBox = document.getElementById('text-box') as HTMLInputElement;
    textBox.addEventListener('input', updateButtonIcon);
    textBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    });

    textBox.focus();
});