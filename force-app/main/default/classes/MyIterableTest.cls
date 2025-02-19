@IsTest
public class MyIterableTest {
  @IsTest
  private static void testIterableForLoop() {
    List<String> strings = new List<String>{ 'Hello', 'World' };
    MyIterable myIterableInstance = new MyIterable(strings);

    for (String str : myIterableInstance) {
      System.debug(str);
      System.assertNotEquals(null, str, 'String should not be null');
    }
  }
}