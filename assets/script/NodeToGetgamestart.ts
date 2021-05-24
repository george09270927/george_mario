
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    gotogamestart () {
        cc.director.loadScene("gamestart");
    }
}
