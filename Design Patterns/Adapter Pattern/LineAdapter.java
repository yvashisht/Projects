public class LineAdapter implements Target {

    private Line adaptee;

    public LineAdapter(Line line) {
        this.adaptee = line;
    }

    @Override
    public void display(int x, int y, int z, int w, String color) {
        adaptee.display(x, y, z, w);
        System.out.println("and it's color is: " + color);
    }

}
