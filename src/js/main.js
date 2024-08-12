const mine_qty = []
const game_box = document.getElementById("game_box");

for (let i = 0; i < 3; i++) {
    const first_box = document.createElement("div");
    for (let j = 0; j < 3; j++) {
        const second_box = document.createElement("div");
        second_box.classList.add("w-8", "h-8", "float-left", "bg-black")
        first_box.appendChild(second_box);
    }
    game_box.appendChild(first_box)
}
