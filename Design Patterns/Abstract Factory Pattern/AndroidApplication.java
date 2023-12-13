public class AndroidApplication extends Application {

    public AndroidApplication() {
        guiFactory = new MacGuiFactory();
    }

    @Override
    void createGuiApplication() {
        guiFactory.createButton("Android Button");
        guiFactory.createMenu();
    }
}
