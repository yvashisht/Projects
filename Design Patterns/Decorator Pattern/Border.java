public class Border extends Decorator {

    private int thickness;

    public Border(Widget w, int t) {
        super(w);
        thickness = t;
    }

    @Override
    public void display() {
        widget.display();
        System.out.println(". Its border thickness is: " + thickness);
    }

}
