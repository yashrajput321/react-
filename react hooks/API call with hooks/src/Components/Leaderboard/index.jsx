import { ThreeDots } from 'react-loader-spinner'
import {LeaderboardContainer,LoadingViewContainer,ErrorMessage} from './styledComponents'
import { useEffect,useState } from 'react'
import LeaderboardTable from '../LeaderboardTable'


const Leaderboard = () => {
  // Your code goes here...
    const apiStatusConstant = {
        initial:'INITIAL',
        inProgress:'IN_PROGRESS',
        success: 'SUCCESS',
        failure:'FAILURE'
    } 

    const [apiResponse,setApiResponse] = useState({
        status:apiStatusConstant.initial,
        data:null,
        errorMsg:null
    })

  useEffect(()=>{

        const apiURL = "https://apis.ccbp.in/leaderboard"
        const option = {
            method: 'GET',
            headers: {
                Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
            },
        }
        const getData = async () => {
  setApiResponse({
    status: apiStatusConstant.inProgress,
    data: null,
    errorMsg: null,
  })

  try {
    const response = await fetch(apiURL, option)
    const responseData = await response.json()

    if (response.ok) {
      setApiResponse({
        status: apiStatusConstant.success,
        data: responseData.leaderboard_data,
        errorMsg: null,
      })
    } else {
      setApiResponse({
        status: apiStatusConstant.failure,
        data: null,
        errorMsg: responseData.error_msg,
      })
    }
  } catch (error) {
    setApiResponse({
      status: apiStatusConstant.failure,
      data: null,
      errorMsg: "Network error occurred",
    })
  }
}

    getData()

  },[])

    const renderLoadingView = () => (
        <LoadingViewContainer>
            <ThreeDots color="#ffffff" height="50" width="50" />
        </LoadingViewContainer>
    )
    const renderSuccessView = () => {
        const {data} = apiResponse
        const formattedResponse = data.map((eachUser)=>({
            id: eachUser.id,
            rank:eachUser.rank, 
            profileImgUrl: eachUser.profile_image_url, 
            name: eachUser.name,
            score: eachUser.score,
            language: eachUser.language,
            timeSpent:eachUser.time_spent,
        }))
        return <LeaderboardTable leaderboardData={formattedResponse}/>
    }
    const renderFailureView = () => {
        const {errorMsg} = apiResponse
        return <ErrorMessage>{errorMsg}</ErrorMessage>
    }

  const renderLeaderboard = () => {
  const {status} = apiResponse
    switch (status) {
        case apiStatusConstant.inProgress:
            return renderLoadingView()
        case apiStatusConstant.success:
            return renderSuccessView()
        case apiStatusConstant.failure:
            return renderFailureView()
        default:
            return null
    }
}

  return <LeaderboardContainer>{renderLeaderboard()}</LeaderboardContainer>
}

export default Leaderboard
