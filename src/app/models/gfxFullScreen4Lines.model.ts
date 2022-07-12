import { GfxFullScreen } from './gfxFullScreen.model';

export class GfxFullScreen4Lines extends GfxFullScreen {

    override graphicId: number;
    override graphicMainLine: string;
    override graphicSecondLine: string;
    override fsLines: string[];

    override graphicType: string = "FS4";
    override graphicCss: string = "gfx-FS";

    constructor(graphicId: number, graphicMainLine: string, graphicSecondLine: string, fsLines: string[]) {
        super(graphicId, graphicMainLine, graphicSecondLine, fsLines);
        this.graphicId = graphicId;
        this.graphicMainLine = graphicMainLine;
        this.graphicSecondLine = graphicSecondLine;
        this.fsLines = fsLines;
    }

    override buildFsLines(): string {
        let build: string = "";
        for (let i = 0; i < this.fsLines.length; i++) {
            build += this.fsLines[i];
            i != this.fsLines.length - 1 ? build += " / " : "";
        }
        return build;
    }

    override showGraphic(): string {
        let allFsLines: string = this.buildFsLines();

        return `${this.graphicMainLine} / ${this.graphicSecondLine} / ${this.buildFsLines()}`;
    }
}