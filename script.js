const nav = document.getElementById("nav");

window.onmousemove = (e) => {
        const percent  = e.clientX / window.innerWidth;

        nav.animate(
            {
            transform: `translateX(${percent * nav.offsetWidth * -1}px)`,
        }, {
            // fill : "forwards",
            duration :7000
        });

}

