import React, { Component } from 'react'
import './DetailFilm.css'
import { BsFillAlarmFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { connect } from 'react-redux/es/exports'
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import Popup from "reactjs-popup";

import BoxRightDetail from '../BoxRightDetail/BoxRightDetail';
import Login from '../../LogIn/Login/Login';
import Register from '../../LogIn/Register/Register';
import LogInBox from '../../LogIn/LogInBox';
class DetailFilm extends Component {
    constructor(props) {
        super();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            display: true,
            CinePlex: null,
            idFilm: null,
            day: date,
            title: null,
            items: null,
            BtnSelect: [],
            show: true,
            statusState: true

        }
    }
    componentDidUpdate() {
        if (!this.state.CinePlex && this.props.detailmovie.lsdetaildateMovie && this.props.detailmovie.lsdetailMovie) {
            this.setState({
                CinePlex: this.props.detailmovie.lsdetaildateMovie.Cineplexs[0].Id,
                idFilm: this.props.detailmovie.lsdetailMovie[[0]].ApiFilmId
            }, () => {
                this.props.GetapiFilmIdPayFunc(this.props.detailmovie.lsdetailMovie[[0]].ApiFilmId)
                this.props.GetbannerFilmPayFunc(this.props.detailmovie.lsdetailMovie[[0]].BannerUrl)
                this.props.GetAgeAblePayFunc(this.props.detailmovie.lsdetailMovie[[0]].ApiRatingFormat)
                this.props.GettitleFilmFunc(this.props.detailmovie.lsdetailMovie[[0]].Title)

            })
        }
    }
    componentDidMount() {
        this.props.NowSoonFunc()
    }
    render() {
        const HandleCineplex = (event) => {
            this.setState({
                CinePlex: event.target.value
            }, () => this.props.HandleCineplexFunc(this.state.CinePlex, this.state.day, this.state.idFilm))

        }
        const HandleDay = (event) => {
            this.setState({
                day: event.target.value
            }, () => this.props.HandleDayFunc(this.state.CinePlex, this.state.day, this.state.idFilm))

        }
        function getFormattedDate(dt) {
            var today = new Date(dt)
            var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            var monthNames = new Array("  ", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            )
            var day = week[today.getDay()];
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minu = today.getMinutes();

            if (dd < 10) { dd = '0' + dd }
            if (mm < 10) { mm = '0' + mm }
            if (minu < 10) { minu = '0' + minu }

            return yyyy + '-' + mm + '-' + dd;
        }
        var TimeDay = (dt) => {
            var date = new Date(dt)
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM"
            hours = hours % 12;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            return (`${hours}:${minutes} ${ampm}`)
        }
        const SetBtnSelect = (btn) => {
            let total = 1
            let arr = this.state.BtnSelect

            if (arr.length === total) {
                arr = arr.splice(0, total - 1)
            }

            arr.unshift(btn)
            // console.log(arr)
            this.setState({
                BtnSelect: arr
            })
        }
        return (
            <div className='detailfilm'>
               {console.log(this.props.detailmovie)}
                <div className='detailfilm-left mgR mgT20' >

                    {
                        this.props.detailmovie.lsdetailMovie &&
                        this.props.detailmovie.lsdetailMovie.map((m, i) => (
                            <div key={i} className="mainback">
                                
                                <div style={{ backgroundImage: "url(" + `${m.BannerUrl}` + ")" }} className='detailfilmleft-img' >

                                    <div className='img-left'>
                                        <img src={m.GraphicUrl} style={{ width: "250px", height: "400px" }} alt='a' />
                                    </div>
                                    <div className='IMG-left'>
                                        <h1 className='IMG-p1'>{m.Title}</h1>
                                        <h5 className='IMG-p2'>{m.TitleEn}</h5>
                                        <div className='evaluate'>
                                            <div className='star'>
                                                <div className='star-star'><img src='https://www.galaxycine.vn/website/images/ic_star_yellow.png' /></div>
                                                <div className='star-p'>
                                                    <p>{m.Meta.RatingValue}<span>/10</span></p>
                                                    <p><span>{m.Meta.RatingCount}</span></p>
                                                </div>
                                            </div>
                                            <div className='button'><button>????nh gi??</button></div>
                                        </div>
                                        <div className='box-like'>
                                            <div className='C18'>{m.ApiRatingFormat}</div>
                                            <BsFillAlarmFill className='larm' />
                                            <div className='minutes'>{m.Duration} ph??t</div>
                                            <div className='button-like'><AiOutlineLike className='button-like1' /><div className='like114'>Th??ch 88</div></div>
                                            <div className='share'>Chia S???</div>
                                        </div>
                                        <p className='Category p'><span>Th??? lo???i:</span>{m.ApiGenreName}</p>
                                        <p className='Director p'><span>?????o di???n:</span> Paker Finn</p>
                                        <p className='Country p'><span>Qu???c gia:</span>{m.Countries[0].Name}</p>
                                        <p className='Producer p'><span>Nh?? s???n xu???t:</span> Temple Hill Entertainment</p>
                                        <p className='premieredate p'><span>Ng??y kh???i chi???u:</span>{getFormattedDate(m.OpeningDate)}</p>
                                        <div className='detailfilmleft-content'>
                                            <h3 className='content-film'>N???I DUNG PHIM</h3>
                                            <div>
                                                <p className='film-text1'>{m.SynopsisEn}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Content */}

                            </div>
                        ))
                    }
                    {/* <p className='seemore'>Xem th??m</p> */}
                    <p className='showtimes'>L???CH CHI???U</p>
                    {/* select */}

                    <div className='boxinput'>
                        <select className="b" onChange={(event) => {
                            HandleCineplex(event)
                            this.props.GetdatePayFunc(this.state.day)
                            this.props.GetapiCinemaIdPayFunc(event.target.value)
                            // console.log(event.target.name)
                            
                        }}>
                            <option hidden>Ch???n C???m R???p</option>
                            {this.props.detailmovie.lsdetaildateMovie &&
                                this.props.detailmovie.lsdetaildateMovie.Cineplexs.map((e, u) => (
                                    <option key={u} value={e.Id}>{e.Name}</option>
                                ))
                            }
                        </select>
                        <select className="b" onChange={HandleDay} >

                            {this.props.detailmovie.lsdetaildateMovie &&
                                this.props.detailmovie.lsdetaildateMovie.ShowTimes.map((e, p) => (
                                    <option key={p} value={getFormattedDate(e)}>{getFormattedDate(e)}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='suatchieu'>

                        {/* Khung suat chieu */}
                        {
                            // this.props.detailmovie.lsselect ? <>
                            //     {
                            this.props.detailmovie.lsselect &&
                            this.props.detailmovie.lsselect.Cinemas.Items.map((n, i) => {

                                return (
                                    <div onClick={() => this.props.GetNameCineplexPayFunc(n.Name)} className='timepickerbox' key={i}>
                                        <div className='Galaxynguyendu'><p>{n.Name}</p></div>
                                        <div className='galaxyhour'>
                                            <div className='galaxyhour-left'>2D - Ph??? ?????</div>
                                            <div className='galaxyhour-right'>
                                                {
                                                    n.VersionsCaptions[0].ShowTimes.map((m, i) => {
                                                        return <div className='galaxyhour-div'>
                                                            {

                                                                this.props.UserLogin.lsUserLogin &&
                                                                    this.props.UserLogin.lsUserLogin.status === 200 && this.props.UserLogin.OutLogin === true ?

                                                                    <Link to='/Food' > <button onClick={() => {
                                                                        this.props.GetcineplexPayFunc(n.ApiCinemaId)
                                                                        this.props.GettimeFilmPayFunc(TimeDay(m.ShowTime))
                                                                    }} className='galaxyhour-button' key={i}>{TimeDay(m.ShowTime)}</button> </Link>
                                                                    :

                                                                    <LogInBox />


                                                            }


                                                        </div>

                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )

                            })
                        }

                        {/* B??nh lu???n */}
                        <div className='Comment'>
                            <h3 className='mgB10'>B??NH LU???N</h3>
                            <div className='boxCMT' >
                                {this.props.detailmovie.lsdetailCommentMovie &&
                                    this.props.detailmovie.lsdetailCommentMovie[0].Comment.map((n, v) => {
                                        return (
                                            <div className='TagName' key={v} onClick={() => SetBtnSelect(n.Items)}>
                                                <span className='lstitle'>{n.TagName}</span>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                            <div>
                                {this.state.BtnSelect.length > 0 &&
                                    this.state.BtnSelect.map((m, i) => (
                                        m.map((n, y) => (
                                            <div className='detailcmt' key={y}>
                                                {n.Avatar === null ? <div className='detailcmt-left'><div></div>
                                                    {/* div ???o thay th??? h??nh ???nh null */}
                                                </div>
                                                    :
                                                    <div className='detailcmt-left'><img src={n.Avatar} /></div>
                                                }
                                                <div className='detailcmt-right'>
                                                    <div className='top1'><span>{n.ShowName}</span>{getFormattedDate(n.CreatedAt)}</div>
                                                    <div className='top2'>{n.Comment}</div>
                                                </div>
                                            </div>
                                        ))
                                    ))
                                }
                            </div>


                        </div>
                    </div>
                </div>
              
                <div className='x'>
                    <BoxRightDetail />
                </div>


            </div>

        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        nowsoon: state.nowsoon,
        detailmovie: state.detailmovie,
        nowsoon: state.nowsoon,
        movieToCinema: state.movieToCinema,
        UserRegister: state.UserRegister,
        UserLogin: state.UserLogin,
        PayR: state.PayR
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        NowSoonFunc: (val) => {       //funcion ????? ch???y API
            dispatch({ type: "GetNowSoonSaga", payload: val })
        },
        // IdMovieFunc: (val) => {
        //     dispatch({ type: "GetIdMovieSaga", payload: val })
        // },
        HandleCineplexFunc: (cinePlex, day, idFilm) => {
            // truy???n id cum rap, ngay , ten film v?? l???y v??? danh s??ch c??c r???p chi???u v?? su???t chi???u c???a t???ng rap theo c???m r???p ???? ch???n
            dispatch({ type: "GetCinePlexsagadetail", payload: { cinePlex: cinePlex, day: day, idFilm: idFilm } })
        },
        HandleDayFunc: (cinePlex, day, idFilm) => {
            // truy???n id cum raho ng??y  id film ????? l???y v??? danh sash c??c r???p v?? su???t chi???u theo ng??y m??nh ???? ch???n
            dispatch({ type: "GetDaySaga", payload: { cinePlex: cinePlex, day: day, idFilm: idFilm } })
        },
        GetcineplexPayFunc: (val) => {
            // l???y  id r???p
            dispatch({ type: "GetcineplexPay", payload: val })
        },
        GetapiCinemaIdPayFunc: (val) => {
            // l???y t??n c???m r???p (CGV, BHD)
            dispatch({ type: "GetapiCinemaIdPay", payload: val })
        },
        GetapiFilmIdPayFunc: (val) => {
            // l???y t??n film
            dispatch({ type: "GetapiFilmIdPay", payload: val })
        },
        GetdatePayFunc: (val) => {
            //l???y ng??y
            dispatch({ type: "GetdatePay", payload: val })
        },

        GettimeFilmPayFunc: (val) => {
            //l???y su???t chi???u
            dispatch({ type: "GettimeFilmPay", payload: val })
        },
        GettitleFilmFunc: (val) => {
            //l???y t??n film
            dispatch({ type: "GettitleFilm", payload: val })
        },
        GetbannerFilmPayFunc: (val) => { 
            // l???y banner film
            dispatch({ type: "GetbannerFilmPay", payload: val })
        },
        GetNameCineplexPayFunc: (val) => {
            // l???y t??n r???p
            dispatch({ type: "GetNameCineplexPay", payload: val })
        },
        GetAgeAblePayFunc: (val) => {
            // l???y ????? tu???i 
            dispatch({ type: "GetAgeAblePay", payload: val })
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailFilm)