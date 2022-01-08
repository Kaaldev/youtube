(function() {
  let iframes = [].slice.call(document.getElementsByTagName('iframe'));
  let youtube = iframes.filter(function(el){
    return el.src.indexOf('youtube.com/embed') !== -1;
  });

  youtube.forEach(function(el) {
    let div = document.createElement('div');
    div.setAttribute('class', 'youtube');
    let playButton = document.createElement('div');
    playButton.setAttribute('class', 'play-button');
    div.appendChild(playButton);

    let image = new Image();
    let id = el.src.match(/embed\/(.*)$/).slice(-1).pop();
    if(!id) { return; }
    image.src = 'https://i.ytimg.com/vi_webp/' + id + '/mqdefault.webp';
    image.addEventListener('load', function() {
      div.appendChild(image);
    }.bind(this, div));

    div.addEventListener('click', function() {
      let iframe = document.createElement('iframe');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1');
        this.innerHTML = '';
        this.appendChild(iframe);
    });
    el.parentNode.appendChild(div);
    el.parentNode.removeChild(el);
  });
})();
