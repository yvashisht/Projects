public class AndroidGuiFactory implements GuiFactory {

    protected Button b;
    protected Menu m;
    // protected Scrollbar s;

    @Override
    public Button createButton(String label) {
        b = new AndroidButton(label);
        return b;
    }

    @Override
    public Menu createMenu() {
        m = new AndroidMenu();
        return m;
    }

}