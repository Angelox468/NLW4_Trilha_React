import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { ChallengeBox } from '../components/ChallengeBox';

import { CompletedChallanges } from "../components/CompletedChallenges";
import { Contdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from '../contexts/CountdownContext';


import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengsContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  }


export default function Home(props: HomeProps) {
  console.log(props)

  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      
      <ExperienceBar />

      <CountdownProvider>
      <section>
        <div> 
          <Profile />
          <CompletedChallanges />
          <Contdown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
      </CountdownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const user ={
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  }

  const {level, currentExperience, challengesCompleted } = ctx.req.cookies;
  
  return{
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}