import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBundleLessons } from "../../actions/bundle_actions";
import config from "../../config";

const reducer = ({ bundle }) => ({ bundle });

export default connect(reducer)(function ActiveBanner(props) {
    const {
        leBundle,
        dispatch,
        query,
        slug,
        bundle: { lessons, fetchingBundleLessons },
    } = props;
    // const dispatch = useDispatch;
    console.log("what is disaptch", dispatch);
    console.log("what is lessons", lessons);
    useEffect(() => {
        // Update the document title using the browser API
        if (query) {
            let data = query;
            dispatch(fetchBundleLessons(data));
        } else {
            console.log("else block");
        }
    }, [query]);
    return (
        <div className="active-poster-container">
            <img
                src={
                    leBundle.thumbnail
                        ? `http://odosury.mn${leBundle.thumbnail.path}`
                        : `images/${leBundle}`
                }
                alt="active poster"
                className="active-poster"
            />
            <div className="activeBanner-body">
                {/* <div className="toSingle">
					<Link to={`/bundle/doge`}>wtffffff</Link>
				</div> */}
                <div className="title">{leBundle && leBundle.title ? leBundle.title : null}</div>
                <div className="description">
                    {leBundle && leBundle.description ? leBundle.description : null}
                </div>
                <div className="button-group">
                    <div className="purchase-button">
                        Багц авах {config.formatMoney(leBundle.price)}₮
                    </div>
                    <div className="purchase-button">PREMIUM эрх авах</div>
                </div>
                <div className="lessons">
                    {lessons && lessons.length > 0 && !fetchingBundleLessons ? (
                        lessons.map((les) => {
                            return (
                                <div className="img-container" secret-data={les.title}>
                                    <img
                                        src={`${les.thumbnailSmall.url}${les.thumbnailSmall.path}`}
                                        alt="lesson thumbnail"
                                        className="lesson-thumbnail"
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className="img-container"></div>
                            <div className="img-container"></div>
                            <div className="img-container"></div>
                        </>
                    )}
                </div>
            </div>
            {/* <a href="/bundle/doge">wtfuuuuuuuuuuuuuuuuuuuu</a> */}
        </div>
    );
});
