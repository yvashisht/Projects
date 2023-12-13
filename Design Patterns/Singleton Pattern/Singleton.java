import java.util.ArrayList;

public class Singleton {

    private static Singleton Instance;
    private ArrayList<String> usernameList;
    private ArrayList<String> passwordList;
    private ArrayList<String> nameList;

    private Singleton() {
        usernameList = new ArrayList<String>();
        passwordList = new ArrayList<String>();
        nameList = new ArrayList<String>();
    }

    public static Singleton getInstance() {
        if (Instance == null) {
            Instance = new Singleton();
        }
        return Instance;
    }

    public static void setInstance(Singleton Instance) {
        Singleton.Instance = Instance;
    }

    public void addUsername(String username) {
        usernameList.add(username);
    }

    public void setUsername(int index, String newUsername) {
        usernameList.set(index, newUsername);
    }

    public void removeUsername(int index) {
        usernameList.remove(index);
    }

    public void addPassword(String password) {
        passwordList.add(password);
    }

    public void setPassword(int index, String newPassword) {
        usernameList.set(index, newPassword);
    }

    public void removePassword(int index) {
        usernameList.remove(index);
    }

    public void addName(String name) {
        nameList.add(name);
    }

    public void setName(int index, String newName) {
        nameList.set(index, newName);
    }

    public void removeName(int index) {
        nameList.remove(index);
    }

}
