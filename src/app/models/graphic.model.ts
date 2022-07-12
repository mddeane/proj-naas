export class Graphic {

    graphicId: number;
    graphicMainLine: string;
    graphicSecondLine: string;
    graphicType?: string;
    graphicCss: string = "gfx-default";

    constructor(graphicId: number, mainLine: string, secondLine: string) {
        this.graphicId = graphicId;
        this.graphicMainLine = mainLine;
        this.graphicSecondLine = secondLine;
    }

    public showGraphic() {
        return this.graphicMainLine + " / " + this.graphicSecondLine;
    }
}