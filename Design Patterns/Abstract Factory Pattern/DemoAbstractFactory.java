public class DemoAbstractFactory {
    public static void main(String[] args) {
        Application application;
        application = new AndroidApplication();
        application.createGuiApplication();
        application = new MacApplication();
        application.createGuiApplication();
    }
}
