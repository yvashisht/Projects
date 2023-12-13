abstract class Shape {

    protected RenderStyle renderStyle;

    public Shape(RenderStyle renderStyle) {
        this.renderStyle = renderStyle;
    }

    public void setRenderStyle(RenderStyle style) {
        this.renderStyle = style;
    }

    public void performRender() {
        renderStyle.render();
    }

}