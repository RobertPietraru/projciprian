var images = ["CASE.jpeg", "CASE.jpeg", "CPU.jpeg", "CPU.jpeg", "GPU.jpeg", "GPU.jpeg", "HDDjpeg.jpeg", "HDDjpeg.jpeg", "MB.jpeg", "MB.jpeg", "PSU.jpeg", "PSU.jpeg", "RAM.jpeg", "RAM.jpeg", "Monitor.jpeg", "Monitor.jpeg"];


var shuf_images = images.sort(() => Math.random() - 0.5);

for (var i = 0; i < shuf_images.length; i++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = `<img src="${shuf_images[i]}" alt="Image">`;
    document.querySelector('.game').appendChild(box);

    box.onclick = function () {
        this.classList.add('boxOpen');

        setTimeout(function () {
            let openBoxes = document.querySelectorAll('.boxOpen');
            if (openBoxes.length > 1) {
                if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                    openBoxes[0].classList.add('boxMatch');
                    openBoxes[1].classList.add('boxMatch');
                }
                openBoxes[0].classList.remove('boxOpen');
                openBoxes[1].classList.remove('boxOpen');

                if (document.querySelectorAll('.boxMatch').length === images.length) {
                    alert('win');
                }
            }
        }, 500);
    };
}
