public class MacApplication extends Application {

    public MacApplication() {
        guiFactory = new MacGuiFactory();
    }

    @Override
    void createGuiApplication() {
        guiFactory.createButton("Mac Button");
        guiFactory.createMenu();
    }

}
