function box_open() {
    this.classList.remove("bg-black")
    this.classList.add("bg-gray-400")
}

function flag(){
    this.classList.remove("bg-black")
    this.classList.add("bg-red-400")
}

const mine_qty = []
const game_box = document.getElementById("game_box");

for (let i = 0; i < 9; i++) {
    const first_box = document.createElement("div");
    first_box.classList.add("flex")
    for (let j = 0; j < 9; j++) {
        const second_box = document.createElement("div");
        second_box.classList.add("w-8", "h-8", "bg-black", "m-1");
        second_box.addEventListener("click", box_open);
        second_box.addEventListener("contextmenu", flag);
        first_box.appendChild(second_box);
    }
    game_box.appendChild(first_box)
}
