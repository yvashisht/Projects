public class GraphicsEditor {
    public static void main(String[] args) {
        Shape circle = new Circle(new SolidStyle());
        circle.performRender();
        Shape rectangle = new Rectangle(new DottedStyle());
        rectangle.performRender(); // Outputs: Rendering with a dotted style.
        Shape triangle = new Triangle(new DashedStyle());
        triangle.performRender(); // Outputs: Rendering with a dashed style.

        // Change the render style at runtime
        // circle.setRenderStyle(new DashedStyle());
        // circle.performRender(); // Outputs: Rendering with a dashed style.
    }
}
