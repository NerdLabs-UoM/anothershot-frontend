export const activationTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit;
            margin: 0;
        }

        @media (max-width:670px) {
            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }

            .image_block img+div {
                display: none;
            }

            .mobile_hide {
                display: none;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff;" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 650px; margin: 0 auto;">
                        <tbody>
                            <!-- Header Spacer -->
                            <tr>
                                <td style="height:20px; line-height:20px; font-size:1px;"> </td>
                            </tr>
                            <!-- End Header Spacer -->
                            
                            <!-- Heading -->
                            <tr>
                                <td align="center">
                                    <h2 style="margin: 0; color: #000000; font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 30px; font-weight: 700; line-height: 120%; text-align: center;">
                                        <span>Welcome {{name}}</span>
                                    </h2>
                                </td>
                            </tr>
                            <!-- End Heading -->
                            
                            <!-- Content Spacer -->
                            <tr>
                                <td style="height:20px; line-height:20px; font-size:1px;"> </td>
                            </tr>
                            <!-- End Content Spacer -->
                            
                            <!-- Verification Message -->
                            <tr>
                                <td align="center">
                                    <p style="margin: 0; color: #555555; font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 150%; text-align: center;">
                                        Click Here To Verify Your Email & Activate Account
                                    </p>
                                </td>
                            </tr>
                            <!-- End Verification Message -->
                            
                            <!-- Button -->
                            <tr>
                                <td align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td>
                                                <a href="{{url}}" style="text-decoration: none; display: inline-block; color: #ffffff; background-color: #000000; border-radius: 50px; padding: 5px 20px; font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; text-align: center;" target="_blank">
                                                    <strong>ACTIVATE ACCOUNT</strong>
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- End Button -->
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>

`
