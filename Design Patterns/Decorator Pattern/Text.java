public class Text implements Widget {

    protected int length;
    protected String text;

    public Text(String s) {
        text = s;
        length = text.length();
    }

    @Override
    public void display() {
        System.out.println("This is a plain text: " + text + ", and its length is: " + length);
    }

}
