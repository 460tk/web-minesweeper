difficulty_arry = {easy:[9,9,10], nomal:[16,16,40], hard:[30,16,99]}

function get_random_int(max) {
    return Math.floor(Math.random() * max);
}

const game_box = document.getElementById("game_box");
const selecter = document.getElementsByClassName("difficulty");

class mine_sweeper {
    constructor(data_list) {
        this.game_width = data_list[0];
        this.game_hight = data_list[1];
        this.mine = data_list[2];
        this.first = true;
        this.mine_map = [];
        for (let i = 0; i < this.game_hight; i++) {
            this.mine_map[i] = [];
            for (let j = 0; j < this.game_width; j++) {
                this.mine_map[i][j] = 0;
            }
        }

        this.render_map = [];
        for (let i = 0; i < this.game_hight; i++) {
            this.render_map[i] = [];
            for (let j = 0; j < this.game_width; j++) {
                this.render_map[i][j] = 0;
            }
        }
    }
    set_mine_map(no_mine) {
        let placed_mine = 0;
        while (placed_mine < this.mine) {
            let random_coordinate = []
            random_coordinate[0] = get_random_int(this.game_hight);
            random_coordinate[1] = get_random_int(this.game_width);
            if (this.mine_map[random_coordinate[0]][random_coordinate[1]] === 0 && JSON.stringify(random_coordinate) !== JSON.stringify(no_mine)) {
                this.mine_map[random_coordinate[0]][random_coordinate[1]] = -1;
                placed_mine++;
            }
        }
    }
    open_render_map(horizon, vertical) {
        this.render_map[horizon][vertical] = 0;
    }
    flag_render_map(horizon, vertical) {
        this.render_map[horizon][vertical] = 1;
    }
    render_game_start(game) {
        while (game_box.firstChild) {
            game_box.removeChild(game_box.firstChild);
        }
        this.html_render_list = []
        for (let i = 0; i < this.render_map.length; i++) {
            const vertical_box = document.createElement("div");
            vertical_box.classList.add("flex");
            let horizon_html_render_list = [];
            for (let j = 0; j < this.render_map[i].length; j++) {
                const horizon_box = document.createElement("div");
                horizon_box.id = `${i},${j}`;
                horizon_box.classList.add("w-8", "h-8", "bg-green-200", "m-1", "text-center");
                horizon_box.textContent = this.render_map[i][j];
                horizon_box.addEventListener("click", function() {
                    game.render_box_open(this);
                });
                horizon_box.addEventListener("contextmenu", function() {
                    game.render_flag(this);
                });
                vertical_box.appendChild(horizon_box);
                horizon_html_render_list.push(horizon_box);
            }
            game_box.appendChild(vertical_box);
            this.html_render_list.push(horizon_html_render_list);
        }
    }
    test_render(){
        for (let i = 0; i < this.html_render_list.length; i++) {
            for (let j = 0; j < this.html_render_list[i].length; j++) {
                this.html_render_list[i][j].textContent = this.mine_map[i][j];
            }
        }
    }
    render_box_open(elem) {
        let coordinate = elem.id.split(",").map(Number);
        if (this.first) {
            this.set_mine_map(coordinate);
            this.first = false;
        }
        this.test_render();
        this.render_map[coordinate[0]][coordinate[1]] = -1
        if ((this.mine_map[coordinate[0]][coordinate[1]]) === -1) {
            console.log("Bomb!")
        }
        this.html_render_list[coordinate[0]][coordinate[1]].classList.remove("bg-green-200");
        this.html_render_list[coordinate[0]][coordinate[1]].classList.add("bg-gray-400");
    }
    render_flag(elem) {
        elem.classList.remove("bg-green-200");
        elem.classList.add("bg-red-400");
    }    
}
for (let i = 0; i < selecter.length; i++) {
    selecter[i].addEventListener("click", function(){
        const game_instance = new mine_sweeper(difficulty_arry[this.id]);
        game_instance.render_game_start(game_instance)
    });
}