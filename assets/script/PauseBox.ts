import { Global } from "./Player";


const {ccclass, property} = cc._decorator;

@ccclass
export default class PauseBox extends cc.Component {

    @property(cc.Prefab)
    private UpCursorPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    private DownCursorPrefab: cc.Prefab = null;

    private cursorFlag1 = false;
    private cursorFlag2 = false;

    public init(node: cc.Node) 
    {
        this.setInitPos(node);
        this.createUpCursor();
        Global.pauseUp=true;
    }

    private setInitPos(node: cc.Node)
    {
       this.node.parent= node.parent;

       if(node.position.x<=290)
        {
            this.node.x = 320;   
        }
        else if(node.position.x<=3650)
        {
            this.node.x=node.position.x +40;
        }

        /*
        cc.log(this.node.parent.position);
        cc.log(node.position);
        cc.log(this.node.position);
        */

            
    }

    onLoad()
    {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }


    createUpCursor() {
        let UpCursor = cc. instantiate(this.UpCursorPrefab);
        UpCursor.getComponent('UpCursor').init(this.node);
        Global.pauseUp=true;
        Global.pauseDown=false;
    }

    createDownCursor() {
        let DownCursor = cc. instantiate(this.DownCursorPrefab);
        DownCursor.getComponent('DownCursor').init(this.node);
        Global.pauseDown=true;
        Global.pauseUp=false;
    }




    onKeyDown(event)
    {
        if(event.keyCode==cc.macro.KEY.up)
        {
            if(Global.pauseUp==false) 
            {
                this.createUpCursor();
            }
            Global.pauseCursor=false;
        }
        else if(event.keyCode==cc.macro.KEY.down)
        {

            if(Global.pauseDown==false)
            {
                this.createDownCursor();
            }
            Global.pauseCursor=true;
        }
        else if(event.keyCode==cc.macro.KEY.enter)
        {
            Global.pauseBreak = true;
            if(Global.pauseCursor==false) this.node.destroy();
            else if(Global.pauseCursor==true) 
            {
                cc.director.loadScene("Menu");
            }
        }
        
    }

    
}
