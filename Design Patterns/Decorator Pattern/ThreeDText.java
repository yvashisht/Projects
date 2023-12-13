public class ThreeDText extends Text {

    protected int depth;

    public ThreeDText(String s, int d) {
        super(s);
        depth = d;
    }

    public void diplay() {
        System.out.println("3-D text, " + length + "character long" + depth + "pixel depth");
    }
}
