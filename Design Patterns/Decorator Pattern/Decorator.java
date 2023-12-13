abstract class Decorator implements Widget {

    Widget widget;

    public Decorator(Widget w) {
        widget = w;
    }

}
