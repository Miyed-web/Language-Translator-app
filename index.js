const select = document.querySelectorAll("select");
const translateBtn = document.querySelector("#sendBtn");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const fromCopy = document.querySelector("#fromCopy");
const toCopy = document.querySelector("#toCopy");





select.forEach((tag, id) => {
   for (let country_code in countries) {
      let selected;
      if (id == 0 && country_code == "en-GB") {
         selected = "selected"
      }
      else if (id == 1 && country_code == "bn-IN") {
         selected = "selected"
      }

      let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
      tag.insertAdjacentHTML("beforeend", option);

   }

});



async function translate() {
   toText.value = ""
   try {
      let text = fromText.value;
      if (!text) {
         alert("Enter something to translate");
      }
      toText.setAttribute("placeholder", "Translating....");
      let textFrom = select[0].value;
      let textTo = select[1].value;
      console.log(text, textFrom, textTo);
      let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${textFrom}|${textTo}`;
      let response = await fetch(url);
      let data = await response.json();


      let typingValue = data.responseData.translatedText;
      showTypingEffect(typingValue);
      await toText.setAttribute("placeholder", "Translation");
   } catch (e) {
      alert(e);
   }

}
translateBtn.addEventListener("click", translate);

function showTypingEffect(txt){
   let words = txt.split("");
   let curr = 0;
   let interval = setInterval(()=>{
      toText.value +=  words[curr++];
      if(curr === words.length){
               clearInterval(interval);
            }
   },75);
}




fromCopy.addEventListener("click", () => {
   navigator.clipboard.writeText(fromText.value);
   
   
});
toCopy.addEventListener("click", () => {
   navigator.clipboard.writeText(toText.value);
});


