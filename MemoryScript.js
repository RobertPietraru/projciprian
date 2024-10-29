var images = ["case.jpeg", "case.jpeg", "cpu.jpeg", "cpu.jpeg", "gpu.jpeg", "gpu.jpeg", "hdd.jpeg", "hdd.jpeg", "mb.jpeg", "mb.jpeg", "psu.jpeg", "psu.jpeg", "ram.jpeg", "ram.jpeg", "monitor.jpeg", "monitor.jpeg"];


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
