public class AdapterDemo {
    public static void main(String[] args) {
        Target[] shapes = { new RectangleAdapter(new Rectangle()),
                new LineAdapter(new Line()) };
        int x1 = 10, y1 = 20;
        int x2 = 30, y2 = 60;
        for (Target shape : shapes) {
            shape.display(x1, y1, x2, y2, "Red");
        }
    }
}