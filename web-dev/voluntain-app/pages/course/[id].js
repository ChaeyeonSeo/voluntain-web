import React from 'react'
import { Button, Divider, Fab, Hidden, TextField } from '@material-ui/core'
import ListIcon from '@material-ui/icons/List';
import { useCookies } from 'react-cookie'

import { VideoPlayer } from '../../components/VideoPlayer'
import { NavigationBar } from '../../components/NavigationBar'
import { Comment } from '../../components/Comment'
import { SideBar } from '../../components/SideBar'
import { LectureCards } from '../../components/LectureCards'
import styles from '../../styles/Home.module.css'

/**
 * This function is executed when the floating-button that appears when page
 * width is small is clicked.
 * This does nothing now, but might be replaced with another function.
 */
function nop() { }

/**
 * @requires (from backend)
 * 1. lectureList
 * 2. isFirstLecture
 * 3. isLastLecture
 * 4. Lecture Title
 * 5. videoId
 * 6. the upper LectureCard title / contents
 * 7. the lower LectureCard title / contents
 * 
 * @variation
 * 1. Add or remove Dividers
 * 2. Modify style around Cards
 */
export default function LecturePage() {
  /**
   * This composes the content of the sidebar.
   */
  const lectureList = [
    'About Scratch',
    'Easy',
    'Hard',
  ];

  const lowerCardContent = [
    { 'title': 'Contents', 'content': "- About Scratch (0:00) \n- Exercises (2:00)" },
    { 'title': 'See Also', 'content': "https://google.com \nhttps://bing.com" },
  ]

  /**
   * These check whether the current lecture is the first or last one.
   * If it is, disable Prev or Next button.
   */
  const isFirstLecture = true;
  const isLastLecture = false;

  /**
   * Temporary cookie example
   */
  const [cookies, setCookie] = useCookies(['username', 'video']);
  const [username, setUsername] = React.useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    /**
     * Set a cookie named 'name-cookie' with the value 'name',
     * that is accessible on all pages,
     * and its max age is 10 sec.
     */
    setCookie('username', event.target.value, { path: '/', maxAge: 30 });
    
  }

  /**
   * Video state example
   */
  const [videoEnd, setVideoEnd] = React.useState("Not yet watched");
  const handleVideoEnd = () => {
    /**
     * NOTE: An error occurs when directly passing a string as a prop
     * instead of using 'str'
     */
    let str = "watched"
    setVideoEnd(str);
    setCookie('username', str, { path: '/', maxAge: 30 });
  }

  return (
    <div className={styles.container}>
      <NavigationBar />

      <main className={styles.main}>
        <TextField value={username} onChange={handleUsernameChange} />
        <h3>Hello, {username}! {videoEnd}</h3>
        <h3>Welcome Back, {cookies.username}! {cookies.video}</h3>

        <div>
          <h1>About Scratch</h1>
        </div>

        <div>
          <Button variant="contained" color="primary" disabled={isFirstLecture}>{'< Prev'}</Button>
          {' '}
          <Button variant="contained" color="primary" disabled={isLastLecture}>{'Next >'}</Button>
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <div style={{ border: 'solid', borderWidth: 'thin' }}>
          <VideoPlayer videoId='_9RvpFdUQr0' endChecker={handleVideoEnd} />
        </div>

        <Divider style={{ margin: 10, width: '70%', background: '#ffffff', borderTop: 'thin solid black' }} />

        <LectureCards title="Lecture Info" content="Created on July 22." />

        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 900, alignItems: 'center', justifyContent: 'center' }}>
          {lowerCardContent.map((element) => {
            return <LectureCards title={element.title} content={element.content}/>
          })}
        </div>

        <div style={{ outline: 'thin solid black' }}>
          <Comment />
        </div>
      </main>

      <Hidden smUp>
        <Fab color="primary" style={{ position: 'sticky', bottom: 10, left: 10 }}>
          <ListIcon onClick={nop} />
        </Fab>
      </Hidden>

    </div>
  )
}
