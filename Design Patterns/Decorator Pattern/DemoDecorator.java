public class DemoDecorator {
    public static void main(String[] args) {
        Widget t = new Text("TXT");
        t.display();
        System.out.println();
        t = new Border(t, 2);
        t.display();
        System.out.println();
        t = new Scrollbar(t, "vertical");
        t.display();
    }
}
