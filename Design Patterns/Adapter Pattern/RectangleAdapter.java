public class RectangleAdapter implements Target {

    private Rectangle adaptee;

    public RectangleAdapter(Rectangle rectangle) {
        this.adaptee = rectangle;
    }

    @Override
    public void display(int x, int y, int z, int w, String color) {
        adaptee.display(x, y, z, w);
        System.out.println("and it's color is: " + color);
    }

}
