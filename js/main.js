// init the Speechsynth Api
const synth = window.speechSynthesis;

//DOM Element
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

//init array
let voices = [];

const getVoices = () =>{
    voices = synth.getVoices();

    //Loop through voice and create voice option for each one
    voices.forEach(voice =>{

        //create option 
        let option = document.createElement('option');
        //add voice-name and voice-lang to option
        option.textContent = voice.name + '('+voice.lang+')';
        //add attributes to option
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        //add option to select
        voiceSelect.appendChild(option);
    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () =>{
    //Check if Speaking
    if(synth.speaking){
        console.error('Its Already Speaking...');
        return;
    }

    if(textInput.value !== ''){

        //Add bg-img
        body.style.backgroundImage = "url('img/wave.gif')";
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100%';


        //Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //Speak End
        speakText.onend = e =>{
            console.log('Done Speaking...');
            body.style.background= '#141414';
        }

        //Speak Error
        speakText.onerror = e=>{
            console.log('Something Went Wrong...');
        }

        //Select Voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop Through Voice
        voices.forEach(voice =>{
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //Speak Now
        synth.speak(speakText);
    }

}

//EVENT LISTNER

//spek event
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

//pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice select change
voiceSelect.addEventListener('change', speak());