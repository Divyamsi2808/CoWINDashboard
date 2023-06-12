import {Component} from 'react'

import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const fetchingStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isLoading: 'LOADING',
}

class CowinDashboard extends Component {
  state = {
    fetchingStatus: fetchingStatusConstants.initial,
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getDataRequired()
  }

  getDataRequired = async () => {
    this.setState({fetchingStatus: fetchingStatusConstants.isLoading})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const fetchedData = await fetch(url)
    const jsonData = await fetchedData.json()
    if (fetchedData.ok) {
      const last7DaysVaccination = jsonData.last_7_days_vaccination.map(
        eachObj => ({
          vaccineDate: eachObj.vaccine_date,
          dose1: eachObj.dose_1,
          dose2: eachObj.dose_2,
        }),
      )

      this.setState({
        last7DaysVaccination,
        vaccinationByAge: jsonData.vaccination_by_age,
        vaccinationByGender: jsonData.vaccination_by_gender,
        fetchingStatus: fetchingStatusConstants.success,
      })
    } else {
      this.setState({fetchingStatus: fetchingStatusConstants.failure})
    }
  }

  renderSuccessSection = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-para">Something went wrong</p>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderAllViews = () => {
    const {fetchingStatus} = this.state

    switch (fetchingStatus) {
      case fetchingStatusConstants.success:
        return this.renderSuccessSection()
      case fetchingStatusConstants.failure:
        return this.renderFailureView()
      case fetchingStatusConstants.isLoading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="content-container">
          <div className="header-container">
            <div className="icon-text-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
                alt="website logo"
                className="icon"
              />
              <h1 className="co-win-text">co-WIN</h1>
            </div>
            <h1 className="header-heading">coWIN Vaccination in India</h1>
          </div>
          {this.renderAllViews()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
