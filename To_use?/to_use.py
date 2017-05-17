


####Sends email to user for registration to authenticate

#### if forgot password ... send email password



@app.route('/forgot_password', methods=['GET'])
def forgot_form():
    """Shows forgot password form"""

    return render_template("forgot_password.html")


@app.route('/forgot_password', methods=['POST'])
def forgot_process():
    """Sends email to reset password after submit"""

    email = request.form['email']
    user_in_db = db.session.query(User).filter(User.email==email).first()

    if not user_in_db:
        flash("User not registered")
        return redirect("/register")

    if not user_in_db.is_activated:
        flash("You need to activate your account first")
        return redirect("/login")

    reset_pass_number = randint(10**8, 10**12)
    number_in_db = db.session.query(Activation).filter(Activation.activation_number==reset_pass_number).first()
    
    while number_in_db:
        reset_pass_number = randint(10**8, 10**12)
        number_in_db = db.session.query(Activation).filter(Activation.activation_number==reset_pass_number).first()

    new_activation = Activation(activation_number=reset_pass_number, user_id=user_in_db.user_id)
    db.session.add(new_activation)
    db.session.commit()
    send_email(email, reset_pass_number, 'forgot_pass')
    flash("Please check your email to reset your password")
    return redirect("/login")


@app.route('/reset/<reset_number>', methods=['GET'])
def reset_process(reset_number):
    """Url in email that allows user to change their password"""

    return render_template("reset_password.html", num=reset_number)


@app.route('/reset/<reset_number>', methods=["POST"])
def update_password(reset_number):
    """Updates users table with new password"""

    new_password = argon2.hash(request.form["new_password"])
    number_in_db = db.session.query(Activation).get(reset_number)

    if not number_in_db:
        flash("You need to be a registered user to reset a password")
        return redirect("/register")

    user_id = number_in_db.user_id
    user = db.session.query(User).get(user_id)
    user.password = new_password
    db.session.commit()
    flash("Password successfully updated")
    return redirect("/login")
