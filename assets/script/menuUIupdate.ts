

import { Global } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    private lifeText: cc.Node = null;

    @property(cc.Node)
    private coinText: cc.Node = null;

    @property(cc.Node)
    private scoreText: cc.Node = null;

    @property(cc.Node)
    private usernameText: cc.Node = null;


    start(){
        Global.pauseEnter=false;
        Global.pauseCursor=false;
        Global.pauseUp=false;
        Global.pauseDown=false;
        Global.pauseBreak=false;
        Global.middleflagOn = false;
        Global.globalX = 100;
        Global.globalY = 100;
        Global.timenum = 300;
    }

     onLoad () {
        var messageListRef1 = firebase.database().ref(""+Global.email.replace(/\./g,"_")+"/coin");
        messageListRef1.once('value',function(snapshot)
        {
            Global.coinnum = snapshot.val();
        });

        var messageListRef2 = firebase.database().ref(""+Global.email.replace(/\./g,"_")+"/life");
        messageListRef2.once('value',function(snapshot)
        {
            Global.lifenum = snapshot.val();
        });

        var messageListRef3 = firebase.database().ref(""+Global.email.replace(/\./g,"_")+"/score");
        messageListRef3.once('value',function(snapshot)
        {
            Global.scorenum = snapshot.val();
        });

        var messageListRef4 = firebase.database().ref(""+Global.email.replace(/\./g,"_")+"/username");
        messageListRef4.once('value',function(snapshot)
        {
            Global.username = snapshot.val();
        });



        /*
        var rankRef = firebase.database().ref("rank");
        rankRef.orderByChild("weight").limitToLast(5).once("value", function (snapshot) {
            snapshot.forEach(function (item) {
                console.log(item.val());
            });
        });
        */
    }

    update () {
        this.UIupdate();
    }


    UIupdate(){
        this.lifeText.getComponent(cc.Label).string = "" + Global.lifenum;
        this.coinText.getComponent(cc.Label).string = "" + Global.coinnum;
        this.scoreText.getComponent(cc.Label).string = (Array(7).join('0') + Global.scorenum).slice(-7);
        this.usernameText.getComponent(cc.Label).string = "" + Global.username;  
    }

    // update (dt) {}
}
