import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListEvents.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";

export default function ListEvents(props) {
  const { events } = props;
  return (
    <div className="list-posts">
      {map(events, (event, index) => (
        <Event key={index} event={event} />
      ))}
    </div>
  );
}

ListEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
    }),
  ).isRequired,
};

function Event(props) {
  const { event } = props;

  const iconUrl = event.user?.icon ? event.user.icon : IconNotFound;

  return (
    <div className="post">
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        <div className="name">
          {event.user && (
            <div className="name">
              {event.user.name}
              <span>{moment(event.created_at).calendar()}</span>
            </div>
          )}
        </div>
        <div className="title">
          <strong>タイトル: </strong>{event.title}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(event.content),
          }}
        ></div>
        <div className="event-details">
          <div>
            <strong>イベントURL: </strong>
            <a href={event.event_url} target="_blank" rel="noopener noreferrer">{event.event_url}</a>
          </div>
          <div>
            <strong>開催日: </strong>{event.event_date}
          </div>
        </div>
      </div>
    </div>
  );
}


Event.propTypes = {
  event: PropTypes.shape({
    user: PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    event_url: PropTypes.string.isRequired,
    event_date: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
