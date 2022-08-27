import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./question.css";

const Question = () => {
    return (
        <>
            <Topbar />
            <div className="qustionContainer">
                <Sidebar />
                <div className="question">
                    <div className="questionWrapper">
                        <h1 className="questionTitle">FAQ</h1>
                        <div className="questionsContainer">
                            <div className="questionText">What features do you offer?</div>
                            <p>
                                We offer all features you expect from a modern social media
                                application. They include <b>messenger</b> as well as an
                                ability to <b>follow</b> other users and see
                                their <b>posts.</b> There is also a fully functional search
                                bar, so feel free to search for someone you might know. We
                                also offer a way to express yourself
                                by <b>creating</b> and <b>sharing</b> your <b>posts</b> as
                                well as an ability to <b>comment</b> on
                                posts and <b>bookmark</b> them. We also
                                have <b>notifications</b> system. When someone likes your
                                post, starts following you, or messages you, you will
                                be <b>notified</b>.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I create a post?</div>
                            <p>
                                Go to <b>Home</b> page, or to your <b>Profile</b> page.
                                At the top of the screen, just under navigation bar, you
                                should see share container. It is marked by
                                title "<b>Create a New Post</b>". Write yout post then
                                click on the green <b>Share</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I comment on a post?</div>
                            <p>
                                Go to any <b>post</b> and in the bottom right corner of
                                a post card you should see <b>comment</b> text. Click on
                                text and new window, with input and <b>send</b> button
                                will appear. Write you <b>comment</b> in the input field
                                and click on the green <b>send</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I message a user?</div>
                            <p>
                                Go to the <b>Profile</b> page of a user you want to message.
                                When you arrive there, in the right bar, you should see a
                                green <b>Message</b> button. Click the button and you will
                                be taken to the <b>Messenger</b> page. In the left bar you
                                should see their profile picture and user name. Click on that
                                and start conversation.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I follow a user?</div>
                            <p>
                                In the right bar, there is section marked by
                                title "<b>People You May Know</b>". Just click on any user
                                and when you arrive to user's profile page, click
                                the <b>Follow</b> button. You should be able to see their
                                posts in <b>Home</b> page now.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I unfollow a user?</div>
                            <p>
                                Repeat steps from the previous question. If you already
                                follow a user, you should see <b>Unfollow</b> button instead
                                of follow. Click the <b>Unfollow</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I bookmark a post?</div>
                            <p>
                                Go to any post, and in the top right corner of post card
                                you should see icon represented by three vertical dots.
                                Hover over that icon, and you should
                                see a green <b>Bookmark</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I delete a post?</div>
                            <p>
                                Repeat steps from the previous question. If post was created
                                by you, you should see a red <b>Delete</b> button. Click
                                the <b>Delete</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I updated my profile?</div>
                            <p>
                                Go to your <b>Profile</b> page, and click on the
                                green <b>Settings</b> button. You will be taken to
                                the <b>Settings</b> page from where you can update your
                                profile settings and profile picture.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">How can I updated my cover picture?</div>
                            <p>
                                Go to your <b>Profile</b> page. In the right corner of the
                                screen, just under top bar, you should see <b>Gear</b> icon.
                                Click on the icon and select new picture. Now, under gear
                                icon, you should see a green <b>Save</b> button. Click
                                the <b>Save</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">
                                How to see posts I have bookmarked?
                            </div>
                            <p>
                                In the left bar, you should see icon marked with
                                title <b>Bookmarks</b>. Click on icon and you should be
                                taken to <b>bookmarks</b> page, where you can view all
                                posts you have bookmarked.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">
                                How to unbookmark a post?
                            </div>
                            <p>
                                Repeat steps from the previous question to get to
                                the <b>bookmarks</b> page. In the post card, when you
                                hover over icon represented by three vertical dots you
                                should see a red <b>Unbookmark</b> button. Click
                                the <b>Unbookmark</b> button.
                            </p>
                        </div>
                        <div className="questionsContainer">
                            <div className="questionText">
                                How can I search for something?
                            </div>
                            <p>
                                Click on the <b>search bar</b> in the <b>navigation bar</b>. Type
                                what you want to search for and click the <b>magnifying</b> glass
                                icon.
                            </p>
                        </div>
                        <hr className="questionsHr" />
                        <h2 className="moreQuestionsMainTitle">More Questions?</h2>
                        <p className="moreQuestionsDesc">
                            You have a question that was not answered in the section above or
                            recommendation for our team? Feel free to contact any of our
                            departments from the list bellow.
                        </p>
                        <div className="moreQuestionsContainer">
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">Support</div>
                                <div className="moreQuestionsText">
                                    support@gmail.com
                                </div>
                            </div>
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">Marketing</div>
                                <div className="moreQuestionsText">
                                    marketing@gmail.com
                                </div>
                            </div>
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">Management</div>
                                <div className="moreQuestionsText">
                                    management@gmail.com
                                </div>
                            </div>
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">Production</div>
                                <div className="moreQuestionsText">
                                    production@gmail.com
                                </div>
                            </div>
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">Finance</div>
                                <div className="moreQuestionsText">
                                    finance@gmail.com
                                </div>
                            </div>
                            <div className="moreQuestions">
                                <div className="moreQuestionsTitle">
                                    Research and Development
                                </div>
                                <div className="moreQuestionsText">
                                    development@gmail.com
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Rightbar />
            </div>
        </>
    )
}

export default Question