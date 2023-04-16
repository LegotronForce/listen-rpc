/**
 * @param {string} text 
 */
function parseTime(text) {
    const sections = text.split(' / ');
    const elapsed = sections[0].split(':');
    const total   = sections[1].split(':');
    return [[parseInt(elapsed[0]), parseInt(elapsed[1])], [parseInt(total[0]), parseInt(total[1])]];
}

const observer = new MutationObserver((mutations, observer) => {
    if(document.getElementsByClassName('title style-scope ytmusic-player-bar')[0].innerText == '') return;
    
    const title = document.getElementsByClassName('title style-scope ytmusic-player-bar')[0].innerText;
    const time = parseTime(document.getElementsByClassName('time-info style-scope ytmusic-player-bar')[0].innerText);
    const [name, views, likes] = document.getElementsByClassName("subtitle style-scope ytmusic-player-bar")[0].innerText.split('\n • \n');
    const req = new XMLHttpRequest();
    
    req.open('POST', 'http://localhost:4942/dp', true);
    req.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify({ title, time, name, views, likes }));
    req.send(JSON.stringify({ title, time, name, views, likes }));
    
    req.onreadystatechange = function() {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            console.debug(`ListenRPC successfully sent`);
        } else if(this.readyState === XMLHttpRequest.DONE) {
            console.debug(`ListenRPC unsuccessfully sent for some reason`);
        }
    }
});

observer.observe(document, {
    subtree: true,
    attributes: true
});