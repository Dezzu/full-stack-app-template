package it.fabiodezuani.template.util;

import it.fabiodezuani.template.constant.ApplicationErrors;
import it.fabiodezuani.template.exception.ApplicationException;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class FormatDate {

    private final String datePattern = "dd/MM/yyyy HH:mm:ss";
    private final SimpleDateFormat formatter = new SimpleDateFormat(datePattern);

    public Date format(String date) {
        if (date == null) return null;
        try {
            return formatter.parse(date);
        } catch (ParseException e) {
            throw new ApplicationException(ApplicationErrors.DATA_NON_VALIDA);
        }
    }

    public Date format(Date date) {
        if (date == null) return null;
        String stringDate = formatter.format(date);
        try {
            return formatter.parse(stringDate);
        } catch (ParseException e) {
            throw new ApplicationException(ApplicationErrors.DATA_NON_VALIDA);
        }
    }

    public String formatForOutputString(Date date) {
        if(date == null) return null;
        return formatter.format(date);
    }

    public Date formatForOutput(Date date) {
        if(date == null) return null;
        String stringFormatted = formatter.format(date);
        try {
            return formatter.parse(stringFormatted);
        } catch (ParseException e) {
            throw new ApplicationException(ApplicationErrors.DATA_NON_VALIDA);
        }
    }

}
