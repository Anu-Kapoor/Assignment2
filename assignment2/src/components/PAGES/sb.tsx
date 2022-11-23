import React, { Fragment, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';



import useMediaQuery from '@material-ui/core/useMediaQuery';

import {

  makeStyles,

  createStyles,

  useTheme,

  Theme,

} from '@material-ui/core/styles';



import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';

import Typography from '@material-ui/core/Typography';



import AlertDialog from '../../dialogs/alertDialog';

import DecoratedSelectionCount from './decoratedSelectionCount';



import { getSubmittableSelectedCount } from '../../../selectors/selectionSelectors';

import { submitSelectedContributions } from '../../../form/formActions';



import { gray } from '../../../themes';

import {

  GoogleAnalyticsEvents,

  BatchInteraction,

  BatchSelection,

} from 'src/enums';

import { emitGoogleAnalyticsEvent } from 'src/slices/googleAnalyticsSlice';



const useStyles = makeStyles((theme: Theme) => {

  return createStyles({

    newParagraph: {

      marginTop: theme.spacing(1),

    },

    submitButton: {

      borderRadius: theme.spacing(0),

      height: theme.spacing(8),

      maxWidth: theme.spacing(17.5),

      padding: theme.spacing(0, 2.5),

      position: 'absolute',

      right: theme.spacing(0),

    },

    submitIcon: {

      marginRight: theme.spacing(0.5),

      width: theme.spacing(2.5),

    },

    submitText: {

      color: theme.palette.common.white,

    },

  });

});



const confirmationText = (submittableCount: number) => {

  if (submittableCount > 1) {

    return {

      youAreAboutToSubmit: 'you_are_about_to_submit_the_selected_files',

      haveYouChecked:

        'have_you_checked_that_the_metadata_for_the_files_are_correct',

    };

  }



  return {

    youAreAboutToSubmit: 'you_are_about_to_submit_the_selected_file',

    haveYouChecked:

      'have_you_checked_that_the_metadata_for_this_file_is_correct',

  };

};



const SubmitButton: React.FC = (_props) => {

  const { t } = useTranslation();

  const classes = useStyles();

  const dispatch = useDispatch();

  const submittableCount = useSelector(getSubmittableSelectedCount);

  const theme = useTheme();



  const [openSubmitAlert, setOpenSubmitAlert] = useState(false);



  const { youAreAboutToSubmit, haveYouChecked } =

    confirmationText(submittableCount);



  const mediumOrSmaller = useMediaQuery<Theme>(

    (theme) => theme.breakpoints.down('md'),

    {

      noSsr: true,

    }

  );



  const handleDialogOpen = () => {

    dispatch(

      emitGoogleAnalyticsEvent({

        event: GoogleAnalyticsEvents.BatchInteraction,

        batch_interaction: BatchInteraction.FileSubmit,

        batch_selection: BatchSelection.SubmissionDetailsBar,

        file_quantity: submittableCount,

      })

    );

    setOpenSubmitAlert(true);

  };



  const handleSubmit = () => {

    setOpenSubmitAlert(false);

    dispatch(submitSelectedContributions());

  };



  const cancelSubmit = () => {

    setOpenSubmitAlert(false);

  };



  const disabled = !submittableCount;

  const color = disabled ? gray : theme.palette.primary.contrastText;



  const buttonBackgroundColor = disabled

    ? 'inherit'

    : theme.palette.primary.main;



  // FIXME: We should avoid using both className and style attributes. You can compute class names

  // based on props via makeStyles.

  return (

    <Fragment>

      <Button

        data-cy="submit-button"

        className={classes.submitButton}

        size="large"

        style={{ backgroundColor: buttonBackgroundColor }}

        disabled={disabled}

        onClick={handleDialogOpen}

      >

        {!mediumOrSmaller && (

          <SendIcon

            className={classes.submitIcon}

            style={{ color }}

            data-cy="submit-button-icon"

          />

        )}

        <Typography className={classes.submitText} style={{ color }}>

          {t('submit')}

        </Typography>

        {!mediumOrSmaller && (

          <DecoratedSelectionCount

            content={submittableCount.toString()}

            backgroundColor={color}

          />

        )}

      </Button>



      <AlertDialog

        cancelText={t('cancel')}

        confirmText={t('yes_submit')}

        content={

          <Fragment>

            <Typography component="span" display="block">

              {t(youAreAboutToSubmit)}

            </Typography>

            <Typography

              className={classes.newParagraph}

              component="span"

              display="block"

            >

              {t(haveYouChecked)}

            </Typography>

          </Fragment>

        }

        onCancelClick={cancelSubmit}

        onConfirmClick={handleSubmit}

        visible={openSubmitAlert}

        title=""

      />

    </Fragment>

  );

};



export default SubmitButton;





