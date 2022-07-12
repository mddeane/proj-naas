import { Graphic } from "./graphic.model";

export class GfxLowerThird extends Graphic {

    override graphicId: number;
    override graphicMainLine: string;
    override graphicSecondLine: string;
    override graphicType: string = "L3";
    override graphicCss: string = "gfx-L3";


    constructor(graphicId: number, graphicMainLine: string, graphicSecondLine: string) {
        super(graphicId, graphicMainLine, graphicSecondLine);
        this.graphicId = graphicId;
        this.graphicMainLine = graphicMainLine;
        this.graphicSecondLine = graphicSecondLine;
    }

    override showGraphic(): string {
        return `${this.graphicMainLine} / ${this.graphicSecondLine}`;
    }
}