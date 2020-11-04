import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 120,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  return (
    <div className={classes.root}>
      <Slider
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.handleChange}
        onChangeCommitted={props.handleBlur}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
