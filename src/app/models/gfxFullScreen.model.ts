import { Graphic } from './graphic.model';

export class GfxFullScreen extends Graphic {

    override graphicId: number;
    override graphicMainLine: string;
    override graphicSecondLine: string;
    fsLines: string[];

    override graphicType: string = "FS";
    override graphicCss: string = "gfx-FS";

    constructor(graphicId: number, graphicMainLine: string, graphicSecondLine: string, fsLines: string[]) {
        super(graphicId, graphicMainLine, graphicSecondLine);
        this.graphicId = graphicId;
        this.graphicMainLine = graphicMainLine;
        this.graphicSecondLine = graphicSecondLine;
        this.fsLines = fsLines;
    }

    buildFsLines(): string {
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