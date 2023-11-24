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
      description: PropTypes.string,
    }),
  ).isRequired,
};

function Event(props) {
  const { event } = props;

  const iconUrl = event.user?.icon ? event.user.icon : IconNotFound; // Using the updated user state

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
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(event.description),
          }}
        ></div>
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
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
