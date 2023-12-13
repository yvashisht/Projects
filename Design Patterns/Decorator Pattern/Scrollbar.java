public class Scrollbar extends Decorator {

    private String type;

    public Scrollbar(Widget w, String s) {
        super(w);
        type = s;
    }

    @Override
    public void display() {
        widget.display();
        System.out.println(". Its scroll bar type is: " + type);
    }
}
