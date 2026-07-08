let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning Mam");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Mam");
    } else {
        speak("Good Evening Mam");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

// Speech Recognition
let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

// Button Click
btn.addEventListener("click", () => {
    console.log("Button Clicked");

    btn.disabled = true;
    btn.style.display = "none";
    voice.style.display = "block";

    recognition.start();
});

// Speech Result
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;

    console.log("You Said:", transcript);

    content.innerText = transcript;

    takecommand(transcript.toLowerCase());
};

// Recognition End
recognition.onend = () => {
    console.log("Recognition Ended");

    btn.disabled = false;
    btn.style.display = "flex";
    voice.style.display = "none";
};

// Error
recognition.onerror = (event) => {
    console.log("Speech Error:", event.error);

    btn.disabled = false;
    btn.style.display = "flex";
    voice.style.display = "none";
};

function takecommand(message) {

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello Mam, what can I help you?");
    }

    else if (message.includes("who are you")) {
        speak("I am OREX, your virtual assistant, created by Amanpreet Kaur.");
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }

    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com", "_blank");
    }

    else if (message.includes("open facebook")) {
        speak("Opening Facebook");
        window.open("https://www.facebook.com", "_blank");
    }

    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com", "_blank");
    }

    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("https://web.whatsapp.com", "_blank");
    }

    else if (message.includes("open github")) {
        speak("Opening GitHub");
        window.open("https://github.com", "_blank");
    }

    else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn");
        window.open("https://www.linkedin.com", "_blank");
    }

    else if (message.includes("weather")) {
        speak("Opening today's weather");
        window.open("https://www.google.com/search?q=today+weather", "_blank");
    }

    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("Current time is " + time);
    }

    else if (message.includes("date")) {
        let date = new Date().toDateString();
        speak("Today's date is " + date);
    }

    else if (message.includes("google")) {
        speak("Searching on Google");
        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(message)}`,
            "_blank"
        );
    }

    else {
        let finalText =
            "This is what I found on the internet regarding " + message;

        speak(finalText);

        window.open(
            `https://www.google.com/search?q=${encodeURIComponent(message)}`,
            "_blank"
        );
    }
}