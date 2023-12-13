public class WrappedText extends Text {

    protected int width;
    protected int line;

    public WrappedText(String s, int w, int l) {
        super(s);
        width = w;
        line = l;
    }

    public void diplay() {
        System.out.println("This is a wrapped text, " + text + ", and its length is: " + length + "its width is: "
                + width + "and its height is: " + line);
    }
}
