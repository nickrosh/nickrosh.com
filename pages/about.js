import { styled } from '../stitches.config'
import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { parseISO, format, intervalToDuration } from 'date-fns'
import Base from '../layouts/Base'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { ButtonPrimaryIcon } from '../components/ButtonPrimaryIcon'
import stripHtml from '../lib/strip-html'
import items from '../data/about'

export async function getStaticProps() {
  const meta = {
    title: 'About // Nick Roshdieh',
    description:
      "Nick Roshdieh is a Software Engineer focused on MLE and performant systems",
    tagline: 'Nice to Meet You',
    image: '/static/images/code.jpg',
    primaryColor: 'purple',
    secondaryColor: 'cyan',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, image } = props

  const renderIntro = () => {
    return (
      <Container>
        <Section>
          <Image
            alt="Nick"
            src="/static/images/clark_headshot_cropped_bw.JPG"
            width="336"
            height="336"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            <strong>Hey, I'm Nick Roshdieh. </strong>
             I started writing software in 2012 and never looked back. I love
             building products that make people happier, and that free them to do 
              the things<strong> they want to do.</strong>
          </Paragraph>
          <Paragraph>
            I'm currently a <strong>Machine Learning Engineer</strong> at
            Clark Construction, bringing cutting edge models to an industry
            that's ripe for change. I love learning and working in all the parts
             of the tech stack. While my expertise is in <strong>ML and Backend
             </strong>, I've also handled all of my team's AWS deployments and 
             implemented <strong> DevOps</strong> best practices, as well as the
              occasional<strong> React</strong> UI
          </Paragraph>
          <Paragraph>
            <strong>I love dark mode</strong>, open source, and side projects.
            When I'm not working, you'll probably catch me <strong>playing music.</strong>
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    return (
      <div>
        <h3>
        <IconContainer>
          <i className={`ri-code-line`} />
        </IconContainer>
          Languages</h3>
        <p>
          Python, Javascript, Typescript, C, SQL, a little French, learning Go
        </p>
        <h3>
        <IconContainer>
          <i className={`ri-terminal-box-line`} />
        </IconContainer>
          Frameworks</h3>
        <p>
          PyData (Pandas, Numpy, Matplotlib), Tensorflow, Django, FastAPI, Flask, NodeJS,
           React, Express
        </p>
        <h3>
        <IconContainer>
          <i className={`ri-database-2-line`} />
        </IconContainer>
          Databases</h3>
        <p>
          Postgres, MySQL, MongoDB, Snowflake
        </p>
        <h3>
        <IconContainer>
          <i className={`ri-tools-line`} />
        </IconContainer>
          Tools & Cloud</h3>
        <p>
          Git, VSCode, Jupyter Notebooks, Docker, AWS, Google Cloud
        </p>
        <p>
          <ButtonPrimary
            as="a"
            download
            role="button"
            href="/static/images/code.jpg"
          >
            <ButtonPrimaryIcon className="ri-download-2-line" /> Download
            Resume
          </ButtonPrimary>
        </p>
      </div>
    )
  }

  const renderAll = () => {
    return items.map((item, index) => {
      return (
        <div style={{ marginBottom: 40 }} key={index}>
          <h3>{item.jobTitle}</h3>
          <p style={{ margin: 0 }}>
            <a href={item.companyUrl} target="_blank">
              {item.company}
            </a>
            <span> • {item.location}</span>
          </p>
          <p style={{ margin: 0 }}>
            <span>{format(parseISO(item.startDate), 'LLL yyyy')}</span>
            <span> – </span>
            <span>
              {item.endDate
                ? format(parseISO(item.endDate), 'LLL yyyy')
                : 'Present'}
            </span>
            <span> • </span>
            <span>{getDuration(item.startDate, item.endDate)}</span>
          </p>
        </div>
      )
    })
  }

  const getDuration = (startDate, endDate) => {
    const durationObj = intervalToDuration({
      start: parseISO(startDate),
      end: endDate ? parseISO(endDate) : new Date(),
    })

    let durationStr = ''

    if (durationObj.years > 1) {
      durationStr = `${durationObj.years} yrs `
    } else if (durationObj.years === 1) {
      durationStr = `${durationObj.years} yr `
    }

    durationStr += `${durationObj.months} mos`

    return durationStr
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://nickrosh.com/about" property="og:url" />
        <meta content={`https://nickrosh.com${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Tech Stack</h2>
      {renderBio()}

      <h2>Career</h2>
      {renderAll()}
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

const IconContainer = styled('div', {
  color: '$primary',
  fontSize: '24px',
  padding: '0 10px 0 0',
})

About.Layout = Base

export default About
